import { DefaultWrapper } from '../styles';

export default function InfiniteScroll() {
	return (
		<DefaultWrapper>

		</DefaultWrapper>
	)
}

// interface InfiniteScrollOptions {
// 	size: number
// 	onSuccess?: () => void
// 	onError?: (err: unknown) => void
// }
//
// const useInfiniteScroll = <T> (
// 	fetcher: (
// 	params: PaginationParams
// ) => Promise<AxiosResponse<PaginationResponse<T>>>,
// 	{ size, onSuccess, onError }: InfiniteScrollOptions
// ) => {
// 	const [page, setPage] = useState(0)
// 	const [data, setData] = useState<T[]>([])
// 	const [isFetching, setFetching] = useState(false)
// 	const [hasNextPage, setNextPage] = useState(true)
//
// 	const executeFetch = useCallback(async () => {
// 		try {
// 			const {
// 				data: { contents, pageNumber, isLastPage },
// 			} = await fetcher({ page, size })
// 			setData((prev) => prev.concat(contents))
// 			setPage(pageNumber + 1)
// 			setNextPage(!isLastPage)
// 			setFetching(false)
// 			onSuccess?.()
// 		} catch (err) {
// 			onError?.(err)
// 		}
// 	}, [page])
//
// 	useEffect(() => {
// 		const handleScroll = throttle(() => {
// 			const { scrollTop, offsetHeight } = document.documentElement
// 			if (window.innerHeight + scrollTop >= offsetHeight) {
// 				setFetching(true)
// 			}
// 		})
//
// 		setFetching(true)
// 		window.addEventListener('scroll', handleScroll)
// 		return () => window.removeEventListener('scroll', handleScroll)
// 	}, [])
//
// 	useEffect(() => {
// 		if (isFetching && hasNextPage) executeFetch()
// 		else if (!hasNextPage) setFetching(false)
// 	}, [isFetching])
//
// 	return { page, data, isFetching, hasNextPage }
// }

// function UsersPage() {
// 	const { data: users, isFetching } = useInfiniteScroll(fetchUsers, {
// 		size: PAGE_SIZE,
// 	})
//
// 	return (
// 		<Container>
// 			{users.map((user) => (
// 				<Card key={user.id} name={user.name} />
// 			))}
// 			{isFetching && <Loading />}
// 		</Container>
// 	)
// }