import { Component } from "react";

const CHUNK_ERROR_PATTERN =
  /Failed to fetch dynamically imported module|Loading chunk .* failed|error loading dynamically imported module|Importing a module script failed/i;

export default class RouteErrorBoundary extends Component {
  state = { hasError: false, isChunkError: false };

  static getDerivedStateFromError(error) {
    const isChunkError = CHUNK_ERROR_PATTERN.test(error?.message ?? "");
    return { hasError: true, isChunkError };
  }

  componentDidCatch() {
    if (this.state.isChunkError) {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.state.isChunkError) {
        return null;
      }
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p
            className="text-base [font-family:var(--font-body)]"
            style={{ color: "var(--c-ink)" }}
          >
            Ocurrió un error inesperado.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold [font-family:var(--font-body)]"
            style={{
              background: "var(--c-cta-bg)",
              color: "var(--c-cta-ink)",
            }}
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
