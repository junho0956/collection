import { DefaultWrapper } from '../styles';
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

export default function InfiniteScroll() {
	return (
		<DefaultWrapper>
			<SyntaxHighlighter>
				{example}
			</SyntaxHighlighter>
			<SyntaxHighlighter>
				{useInfiniteScroll}
			</SyntaxHighlighter>
		</DefaultWrapper>
	)
}

const useInfiniteScroll = `[hook]
interface Response<T> {
	contents: T[];
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalCount: number;
	isLast: boolean;
}

interface PaginationParams {
	page: number;
	size: number;
}

interface Options {
	size: number
}

const useInfiniteScroll = <T,> (
	fetcher: (params: PaginationParams) => Promise<AxiosResponse<Response<T>>>,
	{ size }: Options
) => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<T[]>([]);
	const [isFetching, setFetching] = useState(false);
	const [hasNextPage, setNextPage] = useState(true);
	const ref = useRef<HTMLElement>(null); // 원하는 ref DOM 에서 사용

	const execute = useCallback(async () => {
		try {
			const {
				data: { contents, pageNumber, isLast },
			} = await fetcher({ page, size })
			setPage(pageNumber + 1)
			setNextPage(!isLast)
			setData((prev) => prev.concat(contents))
		} catch (err:any) {
			throw err;
		} finally {
			setFetching(false)
		}
	}, [page])

	useEffect(() => {
		const handleScroll = throttle(() => {
			if (!ref.current) return;
			const { scrollTop, offsetHeight, scrollHeight } = ref.current;
			if (scrollTop >= (scrollHeight - offsetHeight) * 0.8) { // 80%, execute fetcher
				setFetching(true);
			}
		});

		setFetching(true);
		ref.current?.addEventListener('scroll', handleScroll);
		return () => ref.current?.removeEventListener('scroll', handleScroll);
	}, [ref.current]);

	useEffect(() => {
		if (isFetching && hasNextPage) execute();
		else if (!hasNextPage) setFetching(false);
	}, [isFetching]);

	return { ref, data, isFetching }
}`

const example = `[usage example]
function Contents() {
	const requestSize = 10;
	const { ref, data: contents, isFetching } = useInfiniteScroll(fetchContents, { size:requestSize })

	return (
		<Container ref={ref}>
			{contents.map((content) => (
				<Content key={content.id} {...content} />
			))}
			{isFetching && (
				Array(requestSize).fill(true).map((_,idx) => (
					<ContentSkeleton key={idx} />
				))
			)}
		</Container>
	)
}`