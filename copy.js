let copy = document.getElementById("copy");

let userPost = document.getElementById("userWords");

let copied = document.getElementById("copied");

copy.addEventListener("click", () => {
  copied.style.display = "block";
  userPost.select();

  navigator.clipboard.writeText(userPost.value);
});
