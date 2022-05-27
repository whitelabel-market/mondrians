#! /bin/bash

EXAMPLENFT=MagicMondrian.sol

OUTPUT=full

cd ..

npx hardhat flatten contracts/$EXAMPLENFT > $OUTPUT/$EXAMPLENFT