#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m'

echo ""
printf "${GREEN}Please drag the target folder containing 'index.svg'.${NC}"
read varname
echo "Opening $varname ..."

TPath=${BASH_SOURCE[0]/'init.command'/''}
echo $TPath
echo ''

unlink "${TPath}target"
echo "previous link unlinked (if applicable)."
echo ''

ln -s "$varname" "${TPath}/target"
echo "new link created."
echo ''

cd "${TPath}"
echo "entered ${TPath}"
echo ''

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --auto-open-devtools-for-tabs "http://localhost:7070" & python -m SimpleHTTPServer 7070


# if can't run on Apple
# xattr -d -r com.apple.quarantine ./init.command
# chmod 777 ./init.command