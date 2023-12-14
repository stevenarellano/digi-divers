interface ProfileStat {
    label: string;
    stat: string | number;
}

 type ProfileInfo = ProfileStat[];

 export type { ProfileInfo, ProfileStat };