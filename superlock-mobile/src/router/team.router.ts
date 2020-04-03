import TeamIndex from '@/views/team/team-index';
import TeamChild from '@/views/team/team-child';

export default [
    {
        path: '/team/index',
        name: 'TeamIndex',
        component: TeamIndex
    },
    {
        path: '/team/child/:uid',
        name: 'TeamChild',
        component: TeamChild
    }
];
