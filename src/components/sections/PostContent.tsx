import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import solarizedlight from 'react-syntax-highlighter/dist/esm/styles/prism/solarizedlight';

const PostContent = ({ content }: { content: string }) => {
  return (
    <div className="rounded-lg border bg-gray-100 p-4">
      <ReactMarkdown
        children={content}
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={solarizedlight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          ul({ node, ...props }) {
            if (
              !node ||
              !Array.isArray(node.children) ||
              node.children.length === 0
            ) {
              return null;
            }
            return (
              <ul className="list-disc pl-6">
                {node.children.map((child: any, index: number) => {
                  const listItemValue =
                    child.children &&
                    Array.isArray(child.children) &&
                    child.children[0]?.value;
                  return (
                    listItemValue && (
                      <li key={index} className="flex items-center gap-2">
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-gray-500"></span>
                        {listItemValue}
                      </li>
                    )
                  );
                })}
              </ul>
            );
          },
        }}
      />
    </div>
  );
};

export default PostContent;
