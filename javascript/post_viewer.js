// Task 1: Using .then()/.catch()
function getPostUsingThen(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Using .then()/.catch():");
      console.log("Title:", data.title);
      console.log("Body:", data.body);
    })
    .catch(error => {
      console.error("Error fetching post:", error.message);
    });
}

// Task 2: Using async/await
async function getPostUsingAsync(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
  console.log("Fetching post using async/await...");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const wordCount = data.body.trim().split(/\s+/).length;

    console.log("Title:", data.title.toUpperCase());
    console.log("Word Count:", wordCount);
  } catch (error) {
    console.error("Error fetching post:", error.message);
  }
}

// Task 3: Simulate delay
function simulateDelay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Waited for ${ms} ms`);
      resolve();
    }, ms);
  });
}

// Task 4: Integrate all
async function loadPost(postId) {
  await simulateDelay(1000);
  await getPostUsingAsync(postId);
  console.log("Finished!");
}

// Bonus Task: Fetch multiple posts
async function getMultiplePosts(count) {
  const urls = Array.from({ length: count }, (_, i) =>
    fetch(`https://jsonplaceholder.typicode.com/posts/${i + 1}`).then(res => {
      if (!res.ok) throw new Error("Fetch failed");
      return res.json();
    })
  );

  try {
    const posts = await Promise.all(urls);
    console.log(`\n--- Titles of first ${count} posts ---`);
    posts.forEach(post => console.log(post.title));
  } catch (err) {
    console.error("Error fetching multiple posts:", err.message);
  }
}

// Example usage:
loadPost(1);
// getPostUsingThen(1); // You can also test this separately
// getMultiplePosts(5); // Bonus task
