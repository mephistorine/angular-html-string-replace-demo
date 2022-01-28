import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef } from "@angular/core"
import { HelloComponent } from "./hello/hello.component"

@Component({
  selector: "app-root",
  template: `<p>Test</p><div class="container" #container></div>`
})
export class AppComponent implements AfterViewInit {
  @ViewChild("container")
  private containerRef: ElementRef<HTMLDivElement>

  @ViewChild("container", { read: ViewContainerRef })
  private containerViewRef: ViewContainerRef

  private dbHtmlStr = "<p>Hello it is test</p><app-hello></app-hello><p>test end</p>"

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  public ngAfterViewInit(): void {
    const div = document.createElement('div')
    div.innerHTML = this.dbHtmlStr
    const helloComponentRef = this.containerViewRef.createComponent(HelloComponent)
    div.querySelector("app-hello").replaceWith(helloComponentRef.location.nativeElement)
    this.containerRef.nativeElement.appendChild(div)
  }
}
