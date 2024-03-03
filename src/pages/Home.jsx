import { useEffect } from "react";
import appwriteService from "../appwrite/service";
import { useState } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
	const [posts, setPosts] = useState([]);

	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		appwriteService.getPosts().then((res) => {
			if (res) setPosts(res.documents);
		});
	}, []);

	return posts.length === 0 ? (
		<div className="w-full py-8 mt-4 text-center">
			<Container>
				<div className="flex flex-wrap">
					<div className="p-2 w-full">
						<h1 className="text-2xl font-bold hover:text-gray-500">
							{authStatus
								? "Publish posts to read posts"
								: "Login to read posts"}
						</h1>
					</div>
				</div>
			</Container>
		</div>
	) : (
		<div className="w-full py-8">
			<Container>
				<div className="flex flex-wrap">
					{posts.map((post) => (
						<div key={post.$id} className="p-2 w-1/4">
							<PostCard {...post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

export default Home;
