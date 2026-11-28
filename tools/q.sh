#!/bin/bash
# q: run a long command quietly, to save tokens. The FULL output goes to a log file (nothing is lost); only the lines that
# matter are printed: errors/warnings (up to 30) and the last N lines (default 6).
#   bash tools/q.sh node core/render.ts videos/x        Q_TAIL=15 bash tools/q.sh python3 script.py
set -o pipefail
D="${Q_LOGS:-/tmp/q-logs}"; mkdir -p "$D"; LOG="$D/$(date +%H%M%S)-$$.log"
"$@" > "$LOG" 2>&1; RC=$?
echo "[q] exit $RC · $(wc -l < "$LOG") lines · full log: $LOG" >&2
grep -inE 'error|fail|traceback|exception|warn' "$LOG" | grep -viE 'no error|0 error|errors?: 0|warnings?: 0' | head -30
echo "[q] last lines:" >&2; tail -n "${Q_TAIL:-6}" "$LOG"
exit $RC
