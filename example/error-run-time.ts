interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
}

// Get books published between two years, inclusive
function getBooksPublishedBetween(books: Book[], fromYear: number, toYear: number): Book[] {
  return books.filter((book) => book.publicationYear >= fromYear && book.publicationYear <= toYear);
}

exports.handler = async function (event: any) {
  const fromYear = event.fromYear || 2000;
  const toYear = event.toYear || 2010;

  const books: Book[] = [
    { id: 1, title: 'Book A', author: 'Author 1', publicationYear: 1995 },
    { id: 2, title: 'Book B', author: 'Author 2', publicationYear: 2005 },
    { id: 3, title: 'Book C', author: 'Author 3', publicationYear: 2015 },
  ];

  // Unintentionally providing the wrong arguments order, causing a logic error
  const filteredBooks = getBooksPublishedBetween(books, toYear, fromYear);
  console.log(filteredBooks); // Will output an empty array due to the wrong arguments order

  return {
    statusCode: 200,
    body: JSON.stringify(filteredBooks)
  };
};
