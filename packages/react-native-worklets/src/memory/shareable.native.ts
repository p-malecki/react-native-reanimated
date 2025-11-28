'use strict';

import { WorkletsError } from '../debug/WorkletsError';
import { getUIWorkletRuntime } from '../runtimes';
import type { WorkletRuntime } from '../types';
import { WorkletsModule } from '../WorkletsModule/NativeWorklets';
import { createSerializable } from './serializable';
import type { SerializableRef, Shareable } from './types';

/**
 * @deprecated Only UI host runtime is supported now. Use 'UI' as the
 *   hostRuntime argument.
 */
export function createShareable<TValue = unknown>(
  hostRuntime: WorkletRuntime,
  initialValue: SerializableRef<TValue>
): Shareable<TValue>;

export function createShareable<TValue = unknown>(
  hostRuntime: WorkletRuntime | 'UI',
  initialValue: TValue
): Shareable<TValue> {
  let actualHostRuntime: WorkletRuntime;
  if (hostRuntime === 'UI') {
    actualHostRuntime = getUIWorkletRuntime();
  } else {
    throw new WorkletsError('Only UI host runtime is supported currently');
  }

  const shareableRef = WorkletsModule.createShareable(
    actualHostRuntime,
    createSerializable(initialValue)
  );

  return globalThis.__shareableUnpacker(
    shareableRef,
    false
  ) as unknown as Shareable<TValue>;
}
