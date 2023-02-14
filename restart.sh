#!/usr/bin/env bash

[ `whoami` = root ] || { sudo "$0" "$@"; exit $?; }

caddy stop
caddy start
systemctl restart liebermen.service
