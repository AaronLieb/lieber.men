#!/usr/bin/env bash

./blog/tools/build && sudo systemctl reload caddy && sudo systemctl restart liebermen.service
