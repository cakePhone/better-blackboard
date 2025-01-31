<script lang="ts">
  import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
  import { Window } from "@tauri-apps/api/window";
  import { Webview } from "@tauri-apps/api/webview";

  let username: string = $state("");
  let password: string = $state("");
  let access_token: string | null = $state(null);
  let message: string = $state("");
  let courses: Array<{ id: string; name: string }> = $state([]);

  async function openWebview() {
    const appWindow = new Window("uniqueLabel", {
      width: 400,
      height: 600,
    });

    const webview = new Webview(appWindow, "uniqueLabel", {
      url: "https://elearning.uminho.pt/",
      width: 400,
      height: 600,
      x: 0,
      y: 0,
    });

    webview.once("tauri://created", async function (e) {
      console.log(e);
      console.log(webview.listeners);
    });
    webview.once("tauri://error", function (e) {
      console.error(e.payload);
    });
  }
</script>

<form>
  <!-- <h1>Settings</h1> -->
  <!-- <label> -->
  <!--   <p>Username</p> -->
  <!--   <input bind:value={username} /> -->
  <!-- </label> -->
  <!-- <label> -->
  <!--   <p>Password</p> -->
  <!--   <input type="password" bind:value={password} /> -->
  <!-- </label> -->
  <!-- <p>{message}</p> -->
  <button type="submit" onmousedown={() => openWebview()}>Login</button>

  <!-- <iframe -->
  <!--   title="Login page for BlackBoard" -->
  <!--   src={iframeSrc} -->
  <!--   width="100%" -->
  <!--   height="600px" -->
  <!--   onload={handleLoad} -->
  <!--   style="border: none;" -->
  <!-- ></iframe> -->
</form>

<style>
  form {
    padding: 1rem;

    border-radius: 1rem;

    background-color: var(--grey-200);
  }

  @media (prefers-color-scheme: dark) {
    form {
      background-color: var(--grey-800);
    }
  }
</style>
