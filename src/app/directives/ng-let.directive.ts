import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * @publicApi
 */
 export class NgLetContext<T = unknown> {
  public $implicit: T = null!;
  public ngLet: T = null!;
}

@Directive({selector: '[ngLet]'})
export class NgLetDirective<T = unknown> {
  private _context: NgLetContext<T> = new NgLetContext<T>();
  private _templateRef: TemplateRef<NgLetContext<T>>|null = null;
  private _viewRef: EmbeddedViewRef<NgLetContext<T>>|null = null;

  constructor(private _viewContainer: ViewContainerRef, templateRef: TemplateRef<NgLetContext<T>>) {
    this._templateRef = templateRef;
  }

  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   */
  @Input()
  set ngLet(value: T) {
    this._context.$implicit = this._context.ngLet = value;
    this._updateView();
  }

  private _updateView() {
    if (!this._viewRef) {
      this._viewContainer.clear();
      if (this._templateRef) {
        this._viewRef =
            this._viewContainer.createEmbeddedView(this._templateRef, this._context);
      }
    }
  }

  /**
   * Assert the correct type of the expression bound to the `ngLet` input within the template.
   *
   * The presence of this static field is a signal to the Ivy template type check compiler that
   * when the `NgLet` structural directive renders its template, the type of the expression bound
   * to `ngLet` should be narrowed in some way. For `NgLet`, the binding expression itself is used to
   * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgLet`.
   */
  static ngTemplateGuard_ngLet: 'binding';

  /**
   * Asserts the correct type of the context for the template that `NgLet` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgLet` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(dir: NgLetDirective<T>, ctx: any):
      ctx is NgLetContext<Exclude<T, false|0|''|null|undefined>> {
    return true;
  }
}
