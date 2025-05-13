import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  imports: [MatIcon, MatButton],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  standalone: true
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' = 'error';
  @Input() duration: number = 5000;

  private timer: any;

  ngOnInit() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.dismiss(), this.duration);
    }
  }

  dismiss() {
    clearTimeout(this.timer);
    const toast = document.querySelector('app-toast');
    if (toast) {
      toast.remove();
    }
  }

}
