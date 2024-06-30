import { FocusMonitor } from '@angular/cdk/a11y';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';

/** Data structure for holding telephone number. */
export class MyTel {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string
  ) {}
}

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'tel-input',
  templateUrl: 'phone-number.component.html',
  styleUrl: 'phone-number.component.css',
  providers: [{ provide: MatFormFieldControl, useExisting: MyTelInput }],
  host: {
    '[class.tel-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTelInput
  implements ControlValueAccessor, MatFormFieldControl<MyTel>, OnDestroy
{
  static nextId = 0;
  readonly areaInput = viewChild.required<HTMLInputElement>('area');
  readonly exchangeInput = viewChild.required<HTMLInputElement>('exchange');
  readonly subscriberInput = viewChild.required<HTMLInputElement>('subscriber');
  ngControl = inject(NgControl, { optional: true, self: true });
  readonly parts: FormGroup<{
    area: FormControl<string | null>;
    exchange: FormControl<string | null>;
    subscriber: FormControl<string | null>;
  }>;
  readonly stateChanges = new Subject<void>();
  readonly touched = signal(false);
  readonly controlType = 'tel-input';
  readonly id = `tel-input-${MyTelInput.nextId++}`;
  readonly _userAriaDescribedBy = input<string>('', {
    alias: 'aria-describedby',
  });
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  readonly _required = input<boolean, unknown>(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly _disabledByInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly _value = model<MyTel | null>(null, { alias: 'value' });
  onChange = (_: any) => {};
  onTouched = () => {};

  protected readonly _formField = inject(MAT_FORM_FIELD, {
    optional: true,
  });

  private readonly _focused = signal(false);
  private readonly _disabledByCva = signal(false);
  private readonly _disabled = computed(
    () => this._disabledByInput() || this._disabledByCva()
  );
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  get focused(): boolean {
    return this._focused();
  }

  get empty() {
    const {
      value: { area, exchange, subscriber },
    } = this.parts;

    return !area && !exchange && !subscriber;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get userAriaDescribedBy() {
    return this._userAriaDescribedBy();
  }

  get placeholder(): string {
    return this._placeholder();
  }

  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get value(): MyTel | null {
    return this._value();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched();
  }
  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.parts = inject(FormBuilder).group({
      area: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      exchange: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      subscriber: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });

    effect(() => {
      // Read signals to trigger effect.
      this._placeholder();
      this._required();
      this._disabled();
      // Propagate state changes.
      this.stateChanges.next();
    });

    effect(() => {
      if (this._disabled()) {
        this.parts.disable();
      } else {
        this.parts.enable();
      }
    });

    effect(() => {
      this.parts.setValue(this._value() || new MyTel('', '', ''));
    });

    this.parts.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.stateChanges.next();
    });

    this.parts.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const tel = this.parts.valid
        ? new MyTel(
            this.parts.value.area || '',
            this.parts.value.exchange || '',
            this.parts.value.subscriber || ''
          )
        : null;
      this._updateValue(tel);
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn() {
    if (!this._focused()) {
      this._focused.set(true);
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched.set(true);
      this._focused.set(false);
      this.onTouched();
    }
  }

  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.tel-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.subscriber.valid) {
      this._focusMonitor.focusVia(this.subscriberInput(), 'program');
    } else if (this.parts.controls.exchange.valid) {
      this._focusMonitor.focusVia(this.subscriberInput(), 'program');
    } else if (this.parts.controls.area.valid) {
      this._focusMonitor.focusVia(this.exchangeInput(), 'program');
    } else {
      this._focusMonitor.focusVia(this.areaInput(), 'program');
    }
  }

  writeValue(tel: MyTel | null): void {
    this._updateValue(tel);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  private _updateValue(tel: MyTel | null) {
    const current = this._value();
    if (
      tel === current ||
      (tel?.area === current?.area &&
        tel?.exchange === current?.exchange &&
        tel?.subscriber === current?.subscriber)
    ) {
      return;
    }
    this._value.set(tel);
  }
}

/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */