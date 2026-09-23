---
title: 'Debian Netinstall Mirror'
description: 'Standalone installer image for Debian stable — the netinstall ISO I keep coming back to for VMs and bare-metal reinstalls, with a checksum to verify before you write it to USB.'
lang: 'en'
type: 'iso'
tags: ['debian', 'linux', 'installer']
size: '~700 MB'
url: 'https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/'
pubDate: 2026-09-23
---

The official Debian netinstall image, linked straight from the upstream mirror so
you always get the current stable release. The image itself is not hosted here —
ISOs are large and the mirror is faster than anything I could run.

**Before you flash it to USB, verify it:**

1. Download the ISO and the matching `SHA256SUMS` file from the mirror.
2. Run `sha256sum debian-*.iso` and compare against the manifest.
3. Only then write it with `dd`, Ventoy, or Rufus.

After install I usually reach for the [command line cheatsheet](/artifacts/linux-command-line-cheatsheet)
also on this site — the two pair well together.
