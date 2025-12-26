import { CreateUserRequest } from '../../../interface/api/models/UserData';

export interface CreateUserTestCase {
    name: string;
    body: CreateUserRequest;
    expectedStatus: '201' | '400' | '401' | '403' | '500';
}

export const createUserExpectations: CreateUserTestCase[] = [
    {
        name: 'Valid user credentials',
        body: { username: `user${Date.now()}`, password: '12345678' },
        expectedStatus: '201'
    },
    {
        name: 'Valid user with special characters',
        body: { username: `user_${Date.now()}`, password: 'P@ssw0rd!' },
        expectedStatus: '201'
    },
    {
        name: 'Valid user with long password',
        body: { username: `user${Date.now()}`, password: 'VeryLongPassword123456789' },
        expectedStatus: '201'
    },
    {
        name: 'Empty username - should fail',
        body: { username: '', password: '12345678' },
        expectedStatus: '400'
    },
    {
        name: 'Empty password - should fail',
        body: { username: `user${Date.now()}`, password: '' },
        expectedStatus: '400'
    },
    {
        name: 'Very long username - should fail',
        body: { username: `user_${'a'.repeat(200)}_${Date.now()}`, password: '12345678' },
        expectedStatus: '400'
    },
    {
        name: 'Very long password - causes server error',
        body: { username: `user${Date.now()}`, password: 'P@ssw0rd' + 'x'.repeat(500) },
        expectedStatus: '500'
    },
    {
        name: 'Both very long username and password - should fail',
        body: { username: `user_${'b'.repeat(150)}_${Date.now()}`, password: 'P@ss' + 'y'.repeat(300) },
        expectedStatus: '400'
    }
];
