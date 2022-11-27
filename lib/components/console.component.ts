import { settings } from "../../roms/carnival.json"

export class ConsoleComponent {
  constructor(private console: HTMLElement, private image: HTMLImageElement) {
    const src = settings["background-url"]
    image.src = src
  }

  logText(x: string) {
    let p = document.createElement("p")
    p.innerText = x
    if (this.console) {
      this.console.appendChild(p)
    }
  }

  WriteLine(...text: string[]) {
    this.logText(text.join(" "))
    this.smoothScrollWindow(500)
  }

  smoothScrollWindow(px: number) {
    window.scrollBy({
      top: px, // could be negative value
      left: 0,
      behavior: "smooth",
    })
  }
}
