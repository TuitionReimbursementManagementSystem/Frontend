import { createSelector } from "@reduxjs/toolkit";

// Get all of the current user's approval request messages:
const getApprovalMessagesList = state => state.messages.approvalMessagesList;

// Create the selector:
export const getUnreadApprovalRequests = createSelector(
    [getApprovalMessagesList],
    approvalMessagesList => approvalMessagesList.filter(approvalMessage => !approvalMessage.viewed)
);