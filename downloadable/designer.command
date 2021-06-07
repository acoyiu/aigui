#!/bin/bash

# npx http-server -c-1 -p 8080 ./
# echo "${GREEN}Copy above url for display::.${NC}"

GREEN='\033[0;32m'
NC='\033[0m'

echo ""
printf "${GREEN}Please drag the target folder containing 'index.svg'.${NC}"
read varname
echo "Opening $varname ..."

npx http-server $varname -c-1 -p 8080 --cors

echo ""
echo "Copy above link (mostly start with 192) into the redirect page"

# if can't run on Apple
# xattr -d -r com.apple.quarantine ./init.command
# chmod 777 ./init.command