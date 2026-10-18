const activities = [
	{
		id: "moriones",
		title: "Meet the Moriones",
		category: "culture",
		categoryLabel: "Festival & culture",
		description: "Learn about the masked Lenten tradition with a local guide.",
		duration: 90,
		durationLabel: "About 1.5 hours",
		icon: "✳"
	},
	{
		id: "procession",
		title: "Watch a procession",
		category: "culture",
		categoryLabel: "Festival & culture",
		description: "Find a respectful viewing spot and follow local guidance.",
		duration: 120,
		durationLabel: "About 2 hours",
		icon: "〰"
	},
	{
		id: "heritage",
		title: "Wander a heritage town",
		category: "culture",
		categoryLabel: "Island stories",
		description: "Take a slow walk through a town's old streets and churchyard.",
		duration: 90,
		durationLabel: "About 1.5 hours",
		icon: "⌂"
	},
	{
		id: "snack",
		title: "Try a local merienda",
		category: "food",
		categoryLabel: "Local table",
		description: "Make time for pan de pugon or a sweet island snack.",
		duration: 60,
		durationLabel: "About 1 hour",
		icon: "⌁"
	},
	{
		id: "market",
		title: "Browse the local market",
		category: "food",
		categoryLabel: "Local table",
		description: "Meet local makers and pick up something made on the island.",
		duration: 60,
		durationLabel: "About 1 hour",
		icon: "◇"
	},
	{
		id: "coast",
		title: "Take the long way to the coast",
		category: "outdoors",
		categoryLabel: "Island outdoors",
		description: "Leave a free afternoon for sea air and a little unplanned time.",
		duration: 120,
		durationLabel: "About 2 hours",
		icon: "⌇"
	}
];

const storageKeys = {
	itinerary: "marinduque-planner-itinerary",
	date: "marinduque-planner-date",
	reminders: "marinduque-planner-reminders"
};

function readStoredValue(key, fallback) {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : fallback;
	} catch {
		return fallback;
	}
}

let itinerary = readStoredValue(storageKeys.itinerary, []).filter((id) =>
	activities.some((activity) => activity.id === id)
);

const activityList = document.querySelector("#activity-list");
const itineraryItems = document.querySelector("#itinerary-items");
const countLabel = document.querySelector("#plan-count");
const plannedTime = document.querySelector("#planned-time");
const clearButton = document.querySelector("#clear-plan");
const dateInput = document.querySelector("#visit-date");

function saveItinerary() {
	try {
		localStorage.setItem(storageKeys.itinerary, JSON.stringify(itinerary));
	} catch {
		// The planner still works for this visit if storage is unavailable.
	}
}

function renderActivities(filter = "all") {
	const visibleActivities = filter === "all"
		? activities
		: activities.filter((activity) => activity.category === filter);

	activityList.innerHTML = visibleActivities.map((activity, index) => {
		const isAdded = itinerary.includes(activity.id);
		return `
			<article class="activity-row" style="animation-delay: ${index * 45}ms">
				<span class="activity-icon" aria-hidden="true">${activity.icon}</span>
				<div>
					<p class="activity-category">${activity.categoryLabel}</p>
					<h3>${activity.title}</h3>
					<p class="activity-description">${activity.description}</p>
					<p class="activity-duration">${activity.durationLabel}</p>
				</div>
				<button class="add-button" type="button" data-add="${activity.id}" aria-label="${isAdded ? "Added" : "Add"} ${activity.title}" ${isAdded ? "disabled" : ""}>${isAdded ? "✓" : "+"}</button>
			</article>
		`;
	}).join("");
}

function renderItinerary(focusSelector = null) {
	const selectedActivities = itinerary.map((id) => activities.find((activity) => activity.id === id));
	const totalMinutes = selectedActivities.reduce((total, activity) => total + activity.duration, 0);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	countLabel.textContent = String(selectedActivities.length).padStart(2, "0");
	countLabel.setAttribute("aria-label", `${selectedActivities.length} ${selectedActivities.length === 1 ? "activity" : "activities"}`);
	plannedTime.textContent = `${hours} ${hours === 1 ? "hour" : "hours"}${minutes ? ` ${minutes} min` : ""}`;
	clearButton.disabled = selectedActivities.length === 0;

	if (selectedActivities.length === 0) {
		itineraryItems.innerHTML = `
			<div class="empty-plan">
				<span class="empty-sun" aria-hidden="true">✳</span>
				<p>Your day is an open page.</p>
				<span>Add an activity to start planning.</span>
			</div>
		`;
	} else {
		itineraryItems.innerHTML = selectedActivities.map((activity) => `
			<div class="itinerary-entry">
				<div><strong>${activity.title}</strong><small>${activity.durationLabel}</small></div>
				<button class="remove-button" type="button" data-remove="${activity.id}" aria-label="Remove ${activity.title}">×</button>
			</div>
		`).join("");
	}

	renderActivities(document.querySelector(".filter-button.is-active")?.dataset.filter || "all");
	if (focusSelector) {
		const focusTarget = document.querySelector(focusSelector) || document.querySelector(".filter-button.is-active");
		focusTarget?.focus();
	}
}

document.querySelector(".filters").addEventListener("click", (event) => {
	const button = event.target.closest("[data-filter]");
	if (!button) return;

	document.querySelectorAll(".filter-button").forEach((filterButton) => {
		const isActive = filterButton === button;
		filterButton.classList.toggle("is-active", isActive);
		filterButton.setAttribute("aria-pressed", String(isActive));
	});
	renderActivities(button.dataset.filter);
});

activityList.addEventListener("click", (event) => {
	const button = event.target.closest("[data-add]");
	if (!button || itinerary.includes(button.dataset.add)) return;
	const activityId = button.dataset.add;
	itinerary.push(activityId);
	saveItinerary();
	renderItinerary(`#itinerary-items [data-remove="${activityId}"]`);
});

itineraryItems.addEventListener("click", (event) => {
	const button = event.target.closest("[data-remove]");
	if (!button) return;
	const activityId = button.dataset.remove;
	itinerary = itinerary.filter((id) => id !== activityId);
	saveItinerary();
	renderItinerary(`#activity-list [data-add="${activityId}"]`);
});

clearButton.addEventListener("click", () => {
	itinerary = [];
	saveItinerary();
	renderItinerary("#activity-list [data-add]");
});

dateInput.value = readStoredValue(storageKeys.date, "");
dateInput.addEventListener("change", () => {
	try {
		localStorage.setItem(storageKeys.date, JSON.stringify(dateInput.value));
	} catch {
		// The date remains available in the current page session.
	}
});

const savedReminders = readStoredValue(storageKeys.reminders, {});
const reminderInputs = [...document.querySelectorAll("[data-reminder]")];

function updateReminderProgress() {
	const completed = reminderInputs.filter((input) => input.checked).length;
	document.querySelector("#respect-progress-fill").style.width = `${(completed / reminderInputs.length) * 100}%`;
	document.querySelector("#respect-progress-text").textContent = `${completed} of ${reminderInputs.length} checked`;
}

reminderInputs.forEach((input) => {
	input.checked = Boolean(savedReminders[input.dataset.reminder]);
	input.addEventListener("change", () => {
		const currentReminders = Object.fromEntries(reminderInputs.map((reminder) => [reminder.dataset.reminder, reminder.checked]));
		try {
			localStorage.setItem(storageKeys.reminders, JSON.stringify(currentReminders));
		} catch {
			// Checklist state remains interactive when storage is unavailable.
		}
		updateReminderProgress();
	});
});

updateReminderProgress();
renderItinerary();
