import FriendLists from "@src/components/FriendLists";
import NavBar from "@src/components/NavBar";
import Post from "@src/components/Post";
import UserProfile from "@src/components/UserProfile";
import { useAppSelector } from "@src/libs/hooks";
import { Post as PostType, selectPosts } from "@src/store/slice/getPostsSlice";
import { NextPage } from "next";
import { useRouter } from "next/router";

const PostPage: NextPage = (): JSX.Element => {
	const router = useRouter();
	const postId = router.query.id;
	const postData: PostType[] = useAppSelector(selectPosts).posts;
	const post = postData.find((post) => post._id.toString() === postId);
	return (
		<div>
			<NavBar />
			<div className="max-w-[1350px] mx-auto">
				<div className="flex justify-center gap-9">
					<div className="hidden md:block gap-4 max-w-sm py-10">
						<UserProfile />
					</div>
					<div className="flex-1 flex-grow max-w-3xl">
						{post && (
							<Post
								caption={post.caption}
								postImages={post.postImages}
								owner={post.owner}
								commentsId={post.commentsId}
								likes={post.likes}
								postId={post._id.toString()}
								only={true}
								onClick={(e) => e.stopPropagation()}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPage;
