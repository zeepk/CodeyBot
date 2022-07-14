export const maxUserNameLength = 15;
export const minUserNameLength = 4;

export type Profile = {
    authId: string;
    username: string;
};

export type WorkflowOptions = {
    includePushes: boolean;
    pushMessage: string;
    pushBranches: string;
    pushChannel: string;
    includeReleases: boolean;
    releasesMessage: string;
};

export const defaultOptions: WorkflowOptions = {
    includePushes: false,
    pushMessage: '',
    pushBranches: `"*"`,
    pushChannel: '',
    includeReleases: false,
    releasesMessage: '',
};
