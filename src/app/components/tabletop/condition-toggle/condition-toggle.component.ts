import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConditionKey } from 'models/condition';

@Component({
  selector: 'condition-toggle',
  templateUrl: './condition-toggle.component.html',
  styleUrls: ['./condition-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ConditionToggleComponent), multi: true }]
})
export class ConditionToggleComponent implements ControlValueAccessor {
  @Input() condition!: ConditionKey;

  public value: boolean = false;

  private onChange: (value: boolean) => void = (value) => { };
  private onTouched: () => void = () => { };

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggle() {
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
  }

  touch() {
    this.onTouched();
  }
}
