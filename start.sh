#!/usr/bin/env bash

./blog/tools/build && caddy stop && caddy start && sudo systemctl start liebermen.service
