import React from 'react';
import { UserListView } from './Rankings';

const UserCard = ({
    user,
    placing,
}: {
    user: UserListView;
    placing: number;
}) => {
    return (
        <div>
            #{placing} {user.aliasname}
        </div>
    );
};

export default UserCard;
