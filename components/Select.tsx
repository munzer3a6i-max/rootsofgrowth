"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "./Icon";

export type SelectOption = { value: string; label: string };

/**
 * Branded dropdown (replaces the native <select>, whose option list can't be
 * styled). ARIA "select-only combobox": a button that opens a listbox.
 * Keyboard: ↑/↓ (opens/moves), Home/End, Enter/Space (choose), Esc (close),
 * typing jumps to the first matching option. The value is also posted with the
 * form through a hidden input when `name` is given.
 */
export function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  invalid,
  describedBy,
  required,
  className = "",
  fieldAttr,
}: {
  id: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
  /** Classes for the trigger (box size, border, padding). */
  className?: string;
  /** Sets data-field on the trigger (the contact form focuses fields by it). */
  fieldAttr?: string;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  const show = (index = selectedIndex >= 0 ? selectedIndex : 0) => {
    setActive(index);
    setOpen(true);
  };
  const choose = (index: number) => {
    const o = options[index];
    if (o) onChange(o.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Close on outside pointer down.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the active option in view.
  useEffect(() => {
    if (!open || active < 0) return;
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) show();
        else setActive((i) => Math.min(last, i + 1));
        return;
      case "ArrowUp":
        e.preventDefault();
        if (!open) show();
        else setActive((i) => Math.max(0, i - 1));
        return;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        return;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(last);
        }
        return;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else show();
        return;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        return;
      case "Tab":
        if (open) setOpen(false);
        return;
    }
    // Type-ahead.
    if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
      const now = Date.now();
      const t = typed.current;
      t.text = (now - t.at > 600 ? "" : t.text) + e.key.toLowerCase();
      t.at = now;
      const from = open ? active : selectedIndex;
      // A new search starts after the current option; a longer one re-checks it.
      const start = t.text.length === 1 ? from + 1 : Math.max(from, 0);
      const order = options.map((_, k) => (start + k) % options.length);
      const hit = order.find((i) => options[i].label.toLowerCase().startsWith(t.text));
      if (hit !== undefined) {
        if (open) setActive(hit);
        else onChange(options[hit].value);
      }
    }
  };

  return (
    <div ref={rootRef} className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        data-field={fieldAttr}
        data-open={open}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={`group/select flex w-full cursor-pointer items-center justify-between gap-3 text-start ${
          selected ? "text-ink" : "text-muted"
        } ${className}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <Icon
          name="chevron-down"
          size={18}
          className="size-4 shrink-0 text-ink transition-transform duration-200 ease-out group-data-[open=true]/select:rotate-180 lg:size-[18px]"
        />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={id}
        tabIndex={-1}
        data-open={open}
        data-lenis-prevent
        className="select-panel absolute inset-x-0 top-[calc(100%+8px)] z-30 max-h-[288px] overflow-y-auto overscroll-contain rounded-[16px] border border-line bg-white p-[6px] shadow-[0_24px_48px_-12px_rgba(31,26,77,0.18),0_2px_6px_rgba(31,26,77,0.04)]"
      >
        {options.map((o, i) => {
          const isSelected = i === selectedIndex;
          return (
            <li
              key={o.value}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={isSelected}
              data-active={i === active}
              onPointerMove={() => active !== i && setActive(i)}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
              className={`t-body-s flex cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-[10px] transition-colors duration-100 data-[active=true]:bg-lilac-soft lg:px-[14px] ${
                isSelected ? "font-medium text-purple" : "text-ink"
              }`}
            >
              <span>{o.label}</span>
              {isSelected && <Icon name="check" size={16} className="shrink-0 text-purple" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
