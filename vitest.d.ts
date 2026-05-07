import "vitest";
import "jest-axe";

declare module "vitest" {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T;
  }

  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
