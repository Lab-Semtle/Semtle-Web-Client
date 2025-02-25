export default function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="container py-16 pb-32">
      <div className="mx-auto mt-6 max-w-3xl text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 whitespace-pre-line text-base font-medium text-gray-900 dark:text-gray-100 lg:text-lg lg:leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
