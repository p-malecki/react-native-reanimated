#pragma once

#include <worklets/WorkletRuntime/WorkletRuntime.h>
#include <memory>

namespace worklets {

class Shareable {
 private:
  std::shared_ptr<jsi::Value> value_;
  std::weak_ptr<WorkletRuntime> hostRuntime_;
};

} // namespace worklets
