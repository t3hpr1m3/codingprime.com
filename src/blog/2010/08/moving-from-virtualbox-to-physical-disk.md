---
title: Moving from Virtualbox to Physical Disk
date: 2010-08-21 15:50
author: Josh Williams
template: post.jade
---
I decided to convert one of my Gentoo VirtualBox installs to physical disk
(ie. convert Virtual -> Physical ).  This sounded pretty straightforward,
but after a bit of Googling, all I had found were a bunch of articlesi
explaining how to take a physical partition and convert it to a .vdi.  This
was exactly the opposite of what I wanted to do.

Finally, I found [this](http://wiki.przemoc.net/tips/linux)
wiki article, and it all came together.

### Preparing the disks

I had a spare SATA drive laying around, so I powered off the machine and popped
it in.  Using my trusty Gentoo install CD, I partitioned the Linux disk.  My
Virtualbox install had a disk layout like this:

<!--more-->

    /dev/sda1   /boot
    /dev/sda2   <swap>
    /dev/sda3   /
    /dev/sda4   <Extended>
    /dev/sda5   /usr
    /dev/sda6   /var

I basically mirrored that on the Linux drive.  It&#39;s not necessary to be exact,
but make sure each partition has AT LEAST enough space to hold the data you&#39;ll
be moving to it.  I also created one extra partition to hold the .vdi images
temporarily while I got the Linux data extracted.  I would be sure and create
this partition LAST, and at the end of the drive, because once you delete,
renumbering Linux partitions is a pain in the ass.

### Copying the .vdi files

Since my windows install is full of games, and reinstalling would be a bitch,
I wanted to get Gentoo copied over and working with my 2 Windows drives
detached from the system to prevent me from accidentally overwriting, say, the
partition table on one of them.

What I did is use the [IFS driver](http://www.fs-driver.org/) to mount the
extra partition I created above inside Windows, and copied my 2 Virtualbox
.vdi&#39;s to it (Gentoo.vdi and Gentoo2.vdi).  At this point, I shut down the
machine and disconnected the 2 SATA cables from my Windows drives.  Better safe
than sorry.

### Copying the Gentoo system

Again, I booted the box with the Gentoo install CD in the drive.  It
recognized its HDD as `sda` (as expected).  Now it was time to start copying
files.  To make things easier, inside the Gentoo LiveCD environment, I made two
directories, `/mnt/old` and `/mnt/new`.  The names should be pretty self
explanatory.  Based on the wiki article above, I wrote a little shell script to
make mounting the .vdi partitions easier.  I&#39;ll include the script at the
end of the post.  For instance, to get the /boot partition mounted from the
.vdi image and copied to the new Linux drive:

```bash
saturn-gentoo ~ # ./vdi.sh -v /mnt/cdrom/Virtual\ Disks/Gentoo.vdi 
PART          OFFSET ID
1              65536 83
2           34095616 82
3          571351552 83
Which partition to you want to mount? (Enter to skip)> 1
Offset: 65536
Enter a mountpoint > /mnt/old
Filesystem type (ex. ext3) > ext2
Mount command:
   mount "/mnt/cdrom/Virtual Disks/Gentoo.vdi" "/mnt/old" -t ext2 \
      -o loop,offset=65536
Execute now? (Yn) > Y
Mount successful
saturn-gentoo ~ # mount /dev/sda1 /mnt/new
saturn-gentoo ~ # cp -axr /mnt/old/* /mnt/new
saturn-gentoo ~ # umount /mnt/old
saturn-gentoo ~ # umount /mnt/new
```

Rinse and repeat for the remainder of the partitions.

### System configuration

Since the drive identifier (sda) was the same between VirtualBox and the
physical install, I didn&#39;t have to touch `fstab` or `grub`.  I made sure
all partitions were unmounted and rebooted.  With the CD out of the drive, I
was pleasantly surprised to see the Grub prompt, and even more surprised when
everything just booted normally.  I had to do some minimal tweaking to X to
move away from the virtualbox video/input drivers, but other than that, things
Just Worked &reg;.

### VDI script

Here&#39;s the script I used to mount my .vdi partitions.  If anyone finds it
useful, please let me know.

__Disclaimer__: This script may wipe out the ozone layer and promote anarchy
among the masses.  Use at your own risk.

```bash
#!/bin/bash
#==============================================================================
# Copyright 2010 Josh Williams <theprime@codingprime.com>
#
# Quick and dirty bash script to handle mounting .vdi images from VirtualBox
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#===============================================================================

TEMP_FILENAME='/tmp/vdimage'
VDI_FILENAME=''
DUMP_ONLY=0

#
# Print the script usage information
#
function usage() {
  cat << EOF
USAGE: $0 options FILENAME

OPTIONS:
    -h           Show this message
    -p           Print the VDI partition table and exit.
    -t filename  Override the temporary file (default 
                 is ./vdimage)
    -v filename  Path to the .vdi file
EOF
}

#
# Print the extracted partition table
#
function print_partitions() {
  echo "PART          OFFSET ID"
  for part in $@; do
    echo "${part}" | awk -F: '{printf "%-4s %15s %s\n", $1, $2, $3}'
  done
}

#
# Get the partition to be mounted
#
function select_partition() {
  while true; do
    print_partitions ${valid_partitions[@]}
    read -p "Which partition to you want to mount? (Enter to skip)> " part_num
    if [ -n "${part_num}" ]; then
      for (( i = 0 ; i < ${#valid_partitions[@]} ; i++ )); do
        part=${valid_partitions[i]}
        part_id=`echo "${part}" | awk -F: '{print $1;}'`
        if [ ${part_id} == $part_num ]; then
          num=`echo "${part}" | awk -F: '{print $1;}'`
          offset=`echo "${part}" | awk -F: '{print $2;}'`
          typ_id=`echo "${part}" | awk -F: '{print $3;}'`
      
          selected_partition=( $num $offset $typ_id )
          break
        fi
      done
    fi

    if [ -z "${selected_partition}" ]; then
      if [ -z "${part_num}" ]; then
        break
      else
        echo "Invalid partition number: ${part_num}"
        continue
      fi
    else
      break
    fi
  done
}

#
# Get the mountpoint
#
function select_mountpoint() {
  echo "Offset: ${selected_partition[1]}"
  while true; do
    read -p "Enter a mountpoint > " mountpoint
    if [ -n "${mountpoint}" ]; then
      if [ -d "${mountpoint}" ]; then
        break
      else
        echo "Not a valid directory: ${mountpoint}"
        continue
      fi
    else
      break
    fi
  done
}

#
# Select Filesystem type
#
function select_fs_type() {
  supported_filesystems=`cat /proc/filesystems | \
    sed 's/^nodev//' | awk '{print $1;}'`
  while true; do
    valid_fs_type=0
    read -p "Filesystem type (ex. ext3) > " fs_type
    if [ -n "$fs_type" ]; then
      for i in ${supported_filesystems}; do
        if [[ $i == ${fs_type} ]]; then
          valid_fs_type=1
          break
        fi
      done
      if (( $valid_fs_type )); then
        break
      else
        echo "Filesystem type not supported: ${fs_type}"
        echo ""
        fs_type=""
      fi
    else
      break
    fi
  done
}

#
# Handle the actual mounting
#
function handle_mount() {
  echo "Mount command:"
  cmd='mount "'${VDI_FILENAME}'" "'${mountpoint}'" -t '${fs_type}' \
    -o loop,offset='${selected_partition[1]}
  echo "   ${cmd}"
  while true; do
    read -p "Execute now? (Yn) > " answer
    if [ ! -n "${answer}" ]; then answer="Y"; fi
    case $answer in
    [yY])
      mount "${VDI_FILENAME}" "${mountpoint}" -t ${fs_type} -o \
        loop,offset=${selected_partition[1]}
      break
      ;;
    [nN])
      break
      ;;
    *)
      echo "Invalid response: ${answer}\n"
      ;;
    esac
  done
}

#
# Check the arguments
#
while getopts "hv:t:p" OPTION
do
  case $OPTION in
    h)
      usage
      exit 1
      ;;
    v)
      VDI_FILENAME=$OPTARG
      ;;
    t)
      TEMP_FILENAME=$OPTARG
      ;;
    p)
      DUMP_ONLY=1
      ;;
    ?)
      usage
      exit 1
      ;;
  esac
done

#
# Make sure the .vdi file actually exists
#
if [[ -z $VDI_FILENAME ]]; then usage; exit 1; fi

#
# Make sure we're dealing with a fixed size image
#
fixed=`od -j76 -N4 -td4 "${VDI_FILENAME}" | awk 'NR==1{print 2;}'`
if [ $fixed != "2" ]; then echo "Not a fixed disk."; exit; fi

#
# Find the initial offset
#
initial_offset=`od -j344 -N4 -td4 "${VDI_FILENAME}" | awk 'NR==1{print $2;}'`

#
# Extract the partition table
#
dd if="${VDI_FILENAME}" of=${TEMP_FILENAME} bs=1 skip=${initial_offset} \
  count=512 >> /dev/null 2>&1
parts=`sfdisk -luS ${TEMP_FILENAME} 2>&1 | grep -E "^ ?${TEMP_FILENAME}" | \
  sed -E "s|${TEMP_FILENAME}||" | sed 's/*//' | \
  awk '{gsub(/ */,"",$1); print $1 ":" $2 ":" $5;}'`

#
# Cleanup the Temp file
#
if [ -e ${TEMP_FILENAME} ]; then
  rm ${TEMP_FILENAME}
fi

#
# Gather the partitions that are valid for mounting
# This basically drops anything that is an Extended partition ( Type 5 )
#
valid_partitions=( )
for part in $parts; do
  typ_id=`echo $part | awk -F: '{print $3;}'`
  if [ "${typ_id}" != "5" ]; then
    num=`echo "${part}" | awk -F: '{print $1;}'`
    offset=`echo "${part}" | awk -F: '{print $2;}'`
    offset=`echo "${offset} * 512 + $initial_offset" | bc`
    valid_partitions=( "${valid_partitions[@]}" "${num}:${offset}:${typ_id}" )
  fi
done


if (( $DUMP_ONLY )); then
  print_partitions ${valid_partitions[@]}
else
  while true; do
    selected_partition=""
    mountpoint=""
    fs_type=""

    select_partition
  
    if [ -n "${selected_partition}" ]; then
      select_mountpoint
    fi

    if [ -n "${mountpoint}" ]; then
      select_fs_type
    fi
  
    if [ -n "${fs_type}" ]; then
      handle_mount
    fi

    if [ ! -n "$fs_type" ]; then break; fi
  done
fi
```

Is it overkill? Yes. But I did it anyway. Next time: getting Windows back into
the mix.
