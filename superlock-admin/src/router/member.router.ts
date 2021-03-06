import MemberBroker from '@/views/member/member-broker';
import MemberBrokerChild from '@/views/member/member-broker-child';
import MemberRate from '@/views/member/member-rate';
import MemberMigration from '@/views/member/member-migration';

export default [
    {
        path: '/member/broker/:type',
        name: 'MemberBroker',
        component: MemberBroker
    },
    {
        path: '/member/broker/child/:uid',
        name: 'MemberBrokerChild',
        component: MemberBrokerChild
    },
    {
        path: '/member/rate',
        name: 'MemberRate',
        component: MemberRate
    },
    {
        path: '/member/migration',
        name: 'MemberMigration',
        component: MemberMigration
    }
];
