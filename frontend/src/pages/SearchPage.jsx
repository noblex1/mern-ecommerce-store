import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const { searchProducts, products, loading } = useProductStore();
	const query = searchParams.get("q") || "";

	useEffect(() => {
		if (query.trim()) {
			searchProducts(query);
		}
	}, [searchProducts, query]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Search Results
				</motion.h1>

				{query && (
					<motion.p
						className='text-center text-xl text-gray-300 mb-8'
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Results for: <span className='text-emerald-400 font-semibold'>"{query}"</span>
					</motion.p>
				)}

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					{!query.trim() && (
						<div className='col-span-full text-center'>
							<h2 className='text-3xl font-semibold text-gray-300 mb-4'>
								Enter a search term to find products
							</h2>
							<p className='text-gray-400'>
								Use the search bar in the navigation to search for products by name, description, or category.
							</p>
						</div>
					)}

					{query.trim() && products?.length === 0 && (
						<div className='col-span-full text-center'>
							<h2 className='text-3xl font-semibold text-gray-300 mb-4'>
								No products found
							</h2>
							<p className='text-gray-400'>
								Try searching with different keywords or browse our categories.
							</p>
						</div>
					)}

					{products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default SearchPage;
