/**
 * @param {{ fetch: any; }} serverLoadEvent
 * @param {{ error: any; }} serverLoadEvent
 */
export const load = async (serverLoadEvent) => {
  console.log('Loading data');
  try {
    const { fetch } = serverLoadEvent;
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    console.log('Fetched posts:', posts);
    return {
      posts,
    };
  } catch (error) {
    console.log('Error fetching data:', error);
    return {
      error,
    };
  }
};

// /**
//  * @param {{ fetch: any; }} loadEvent
//  * @param {{ error: any; }} loadEvent
//  */

// export async function load(loadEvent) {
//   console.log('Loading data');
//   try {
//     const { fetch } = loadEvent;
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const posts = await response.json();
//
//     console.log('Fetched posts:', posts);
//
//     return {
//       posts
//     };
//   } catch (error) {
//     console.log('Error fetching data:', error);
//     return {
//      error
//     };
//   }
// }
