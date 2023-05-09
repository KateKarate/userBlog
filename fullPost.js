const API_URL_POSTS = 'https://gorest.co.in/public/v2/posts';
const API_URL_COMMENTS = 'https://gorest.co.in/public/v2/comments';

const postTitle = document.getElementById('post-title');
const postBody = document.getElementById('post-body');
const commentsList = document.getElementById('comments-list');

function getIdFromUrl() {
  const params = new URL(document.location).searchParams;
  return params.get('id');
}

async function getPost() {
  const postId = getIdFromUrl();

  const response = await fetch(`${API_URL_POSTS}/${postId}`);
  const post = await response.json();

  postTitle.textContent = post.title;
  postBody.textContent = post.body;

  return post.userId;
}

async function getComments(userId) {
  const response = await fetch(`${API_URL_COMMENTS}?post_id=${getIdFromUrl()}`);
  const comments = await response.json();

  if (comments.length === 0) {
    const noCommentsElement = document.createElement('li');
    noCommentsElement.textContent = "There are no comments to this post yet.";
    commentsList.appendChild(noCommentsElement);
  } else {
    comments.forEach(comment => {
      const commentElement = document.createElement('li');
      commentElement.innerHTML = `
        <p><strong>${comment.name}:</strong> ${comment.body}</p>
      `;
      commentsList.appendChild(commentElement);
    });
  }
}

async function getPostAndComments() {
  const userId = await getPost();
  await getComments(userId);
}

getPostAndComments();
