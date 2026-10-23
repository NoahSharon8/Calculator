const Stored = sessionStorage getItem("...");
{
    if (Stored) {
        equations  = JSON.parse(stored);
    }
    else {
        equations = [];
        sessionStorage.setItem("...", equations);
    }
}