export enum PlacementStatusOptions {

    UNPLACED=0,
    PLACED_PBC=1,
    PLACED_SBC=2,
    GOT_INTERNSHIP=3,
    BANNED=4,
    AWAITED=5,
    REJECTED=6,
}

export const placementStatusOptions = {
    '0': "Unplaced",
    '1': "Placed PBC",
    '2': "Placed SBC",
    '3': "Got Internship",
    '4': "Banned",
    '5': "Awaited",
    '6': "Rejected"
}

export enum CurrentRoundOptions {

    NOTAPPLICABLE=-1,
    APTITUDE=0,
    CODING=1,
    GROUP_DISCUSSION=2,
    TECHNICAL_1=3,
    TECHNICAL_2=4,
    TECHNICAL_3=5,
    HR_1=6,
    HR_2=7,
    HR_3=8,
    TECHNICAL_HR=9,
    PPT=10,
}

export const currentRoundOptions = {

    '-1': "-",    
    '0': "Aptitude",
    '1': "Coding",
    '2': "Technical 1",
    '3': "Technical 2",
    '4': "Technical 3",
    '5': "HR 1",
    '6': "HR 2",
    '7': "HR 3",
    '8': "Technical HR",
    '9': "PPT"
}

export enum CompanyStatusOptions {

    ONGOING=0,
    COMPLETED=1,
    DEFERRED=2,
}

export const companyStatusOptions = {

    '0': "Ongoing",
    '1': "Completed",
    '2': "Deferred"
}


// - Registered
// - shortlisted
//

// 0	UNPLACED
// 1	PLACED_PBC
// 2	PLACED_SBC
// 3	GOT_INTERNSHIP
// 4	BANNED
// 5	SHORTLISTED