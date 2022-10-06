// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Waiting - 0
// Started - 1
// Ended - 2
// Canceled - 3
// Postponed - 4

enum EventStatus {
  Waiting,
  Started,
  Ended,
  Canceled,
  Postponed
}
