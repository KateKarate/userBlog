const API_URL_USERS = 'https://gorest.co.in/public/v2/users';
const API_URL_POSTS = 'https://gorest.co.in/public/v2/posts';

const postsContainer = document.getElementById('posts-container');

function getIdFromUrl() {
  const params = new URL(document.location).searchParams;

  return params.get('id');
}

async function getPosts() {
  const userId = getIdFromUrl();

  const userResponse = await fetch(`${API_URL_USERS}/${userId}`);
  const user = await userResponse.json();

  const postsResponse = await fetch(`${API_URL_POSTS}?user_id=${userId}`);
  const posts = await postsResponse.json();

  if (posts.length === 0) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `
      <h1>${user.name} doesn't have any posts yet</h1>
      <button onclick="window.location.href='index.html'">Go back to users page</button>
    `;
    postsContainer.appendChild(messageElement);
  } else {
    const postListElement = document.createElement('div');
    postListElement.innerHTML = `<h1>Here are all the posts of ${user.name}:</h1>`;
    postsContainer.appendChild(postListElement);

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post-container');
      const bodyWords = post.body.split(' ').slice(0, 10).join(' '); 
      postElement.innerHTML = `
        <h2><a href="fullPost.html?id=${post.id}">${post.title}</a></h2>
        <p>${bodyWords}...</p>
      `;
      postsContainer.appendChild(postElement);
    });
  }
}

getPosts();
