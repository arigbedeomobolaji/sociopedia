import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useAppDispatch, useAppSelector } from "@src/libs/hooks";
import {
	Post as PostType,
	getPostsApi,
	selectPosts,
} from "@src/store/slice/getPostsSlice";
import { UserData, selectMe } from "@src/store/slice/userDataSlice";
import { Typography } from "@material-tailwind/react";

function Posts() {
	const dispatch = useAppDispatch();
	const userData: UserData = useAppSelector(selectMe).userData;
	const token = userData?.token;
	const postData: PostType[] = useAppSelector(selectPosts).posts;
	const [posts, setPosts] = useState<PostType[]>([]);

	useEffect(() => {
		dispatch(getPostsApi(token));
	}, [dispatch, token]);

	useEffect(() => {
		setPosts(postData);
	}, [postData]);

	return (
		<div>
			{posts ? (
				posts.map((post, index) => (
					<Post
						caption={post.caption}
						postImages={post.postImages}
						key={index}
						owner={post.owner}
						commentsId={post.commentsId}
						likes={post.likes}
						postId={post._id.toString()}
					/>
				))
			) : (
				<Typography variants="h6" color="red">
					No Post
				</Typography>
			)}
		</div>
	);
}

export default Posts;
