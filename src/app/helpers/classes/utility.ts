import {NgZone} from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {v4 as uuidv4} from 'uuid';

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function toString(value: any): string {
  return (value !== undefined && value !== null) ? `${value}` : '';
}

export function getValueInRange(value: number, max: number, min = 0): number {
  return Math.max(Math.min(value, max), min);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export function isInteger(value: any): value is number {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

export function regExpEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function hasClassName(element: any, className: string): boolean {
  return element && element.className && element.className.split &&
    element.className.split(/\s+/).indexOf(className) >= 0;
}

if (typeof Element !== 'undefined' && !Element.prototype.closest) {
  // Polyfill for ie10+

  if (!Element.prototype.matches) {
    // IE uses the non-standard name: msMatchesSelector
    Element.prototype.matches = (Element.prototype as any).msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  Element.prototype.closest = function(s: string) {
    let el = this;
    if (!document.documentElement.contains(el)) {
      return null;
    }
    do {
      if (el.matches(s)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

export function closest(element: HTMLElement, selector?: string): HTMLElement | null {
  if (!selector) {
    return null;
  }

  if (typeof element.closest === 'undefined') {
    return null;
  }

  return <HTMLElement>element.closest(selector);
}

/**
 * Force a browser reflow
 * @param element element where to apply the reflow
 */
export function reflow(element: HTMLElement) {
  return (element || document.body).getBoundingClientRect();
}

/**
 * Creates an observable where all callbacks are executed inside a given zone
 *
 * @param zone
 */
export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable(observer => {
      const onNext = (value: T) => zone.run(() => observer.next(value));
      const onError = (e: any) => zone.run(() => observer.error(e));
      const onComplete = () => zone.run(() => observer.complete());
      return source.subscribe(onNext, onError, onComplete);
    });
  };
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export enum eDateFormat{
  DDMMAAAA,
  MMDDAAAA,
  AAAAMMDD
}

export function capitalize(v: string) {
  let v2 = v.toLowerCase();

  return v2.charAt(0).toUpperCase() + v2.slice(1);
}

export function formatDecimal(v: number): string {
  return String((Math.round(v * 100) / 100).toFixed(2));
}

export function generateUUID() {
  return uuidv4();
}

export function gotoBottom(delay: number = 100) {
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, delay);
}

