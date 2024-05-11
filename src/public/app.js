const chatUrlInput = document.getElementById("chat-url");
const downloadButton = document.getElementById("download-btn");
const messageElement = document.getElementById("message");

downloadButton.addEventListener("click", async () => {
  const chatUrl = chatUrlInput.value;

  try {
    console.log("hello");
    const response = await fetch(
      `/api/conversations?chatUrl=${encodeURIComponent(chatUrl)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const conversation = await response.json();
    showMessage("대화 내용이 성공적으로 다운로드되었습니다.", "success");

    // 마크다운 파일로 저장하는 로직은 서버에서 처리
  } catch (error) {
    showMessage(
      `대화 내용을 가져오는 중 오류가 발생했습니다: ${error.message}`,
      "error"
    );
  }
});

function showMessage(text, type) {
  messageElement.textContent = text;
  messageElement.classList.add(type);
  setTimeout(() => {
    messageElement.classList.remove(type);
  }, 3000);
}
