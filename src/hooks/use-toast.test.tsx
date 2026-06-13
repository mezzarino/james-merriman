import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { actionTypes, reducer, useToast } from "./use-toast";

afterEach(() => {
  vi.useRealTimers();
});

describe("useToast reducer", () => {
  it("exposes the remove toast action type", () => {
    expect(actionTypes.REMOVE_TOAST).toBe("REMOVE_TOAST");
  });

  it("updates and removes toasts as expected", () => {
    const initialState = {
      toasts: [
        { id: "toast-1", title: "First", open: true, variant: "default" as const },
        { id: "toast-2", title: "Second", open: true, variant: "default" as const },
      ],
    };

    const updated = reducer(initialState, {
      type: "UPDATE_TOAST",
      toast: { id: "toast-1", title: "Updated" },
    });

    expect(updated.toasts[0]).toMatchObject({ id: "toast-1", title: "Updated" });

    const dismissed = reducer(initialState, { type: "DISMISS_TOAST", toastId: "toast-1" });
    expect(dismissed.toasts[0].open).toBe(false);

    const removed = reducer(initialState, { type: "REMOVE_TOAST" });
    expect(removed.toasts).toEqual([]);
  });
});

describe("useToast hook", () => {
  it("creates, updates, and dismisses toasts through the returned helpers", () => {
    const { result } = renderHook(() => useToast());

    let instance!: ReturnType<typeof result.current.toast>;

    act(() => {
      instance = result.current.toast({ title: "Saved", description: "Profile updated" });
    });

    expect(instance.id).toBeTruthy();
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      title: "Saved",
      description: "Profile updated",
      open: true,
    });

    act(() => {
      instance.update({ id: instance.id, title: "Updated title" });
    });

    expect(result.current.toasts[0]).toMatchObject({ title: "Updated title" });

    act(() => {
      result.current.toasts[0].onOpenChange?.(false);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it("dismisses a toast through the hook helper and removes it after the timeout", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useToast());

    let instance!: ReturnType<typeof result.current.toast>;

    act(() => {
      instance = result.current.toast({ title: "Temporary" });
    });

    act(() => {
      result.current.dismiss(instance.id);
    });

    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000000);
    });

    expect(result.current.toasts).toEqual([]);
  });
});
