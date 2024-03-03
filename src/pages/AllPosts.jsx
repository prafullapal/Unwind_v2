import { useEffect, useState } from "react";
import appwriteService from "../appwrite/service";
import { Container, PostCard } from "../components";

function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		appwriteService
			.getPosts([])
			.then((res) => {
				if (res) setPosts(res.documents);
			})
			.catch((error) => setError(error.message));
		setLoader(false);
	}, []);

	return loader ? (
		<div>Loading...</div>
	) : posts.length === 0 ? (
		<div>No Posts</div>
	) : (
		<div className="w-full py-8">
			<Container>
				<div className="flex flex-wrap">
					{posts?.map((post) => (
						<div key={post.$id} className="p-2 w-1/4">
							<PostCard {...post} />
						</div>
					))}
					<PostCard />
				</div>
			</Container>
		</div>
	);
}

export default AllPosts;
