function setSession() {
								if (maininput.value != "") {
									sessionStorage.mySession = maininput.value;
								} else {
									sessionStorage.mySession = "1991-08-27"; // Default value if input is empty
								}
							}
							function displayLife() {
								const dob = new Date(document.getElementById('dateInput').value);
								const today = new Date();
								const diffInTime = today - dob;
								const diffInWeeks = Math.floor(diffInTime / (7 * 24 * 60 * 60 * 1000));
		
								const timeline = document.getElementById('timeline');
								timeline.innerHTML = '';  // Clear the previous visualization
								const legend = document.getElementById('legend');
								legend.innerHTML = '';  // Clear the previous legends
								const seenLegends = {};
		
								const defaultColor = '#e0e0e0';  // Light gray for non-marked periods
		
								const milestones = [
									{ week: 0, description: 'Birth', color: 'lightgreen', type: 'point' },
									{ week: 260, description: 'Pre-School Period', color: 'lightblue', type: 'period' },
									{ week: 572, description: 'Elementary School', color: 'blue', type: 'period' },
									{ week: 728, description: 'Middle School', color: 'cornflowerblue', type: 'period' },
									{ week: 936, description: 'High School Graduation', color: 'darkblue', type: 'point' },
									{ week: 1144, description: 'College/University', color: 'yellow', type: 'period' },
									{ week: 1196, description: 'Early Career', color: 'purple', type: 'period' },
									{ week: 1404, description: 'Marriage', color: 'pink', type: 'point' },
									{ week: 1560, description: 'Parenthood', color: 'lightpink', type: 'period' },
									{ week: 2080, description: 'Midlife', color: 'darkred', type: 'period' },
									{ week: 2600, description: 'Late Career', color: 'orchid', type: 'period' },
									{ week: 3380, description: 'Retirement', color: 'orange', type: 'point' },
									{ week: 3381, description: 'Golden Years', color: 'gold', type: 'period' },
									{ week: 3744, description: 'Average Life Expectancy', color: 'gray', type: 'point' }
								];
		
								const currentWeek = diffInWeeks;  // Sample value
		
								let currentColor = defaultColor;  // Initialize with the default color
		
								for (let week = 0; week <= 3744; week++) {
									const weekDiv = document.createElement('div');
									weekDiv.className = 'week';
		
									const milestone = milestones.find(m => m.week === week);
		
									if (week === currentWeek) {
										weekDiv.classList.add('blinking');
										weekDiv.innerHTML = `<span class="tooltip">You are here! - Week ${week}</span>`;
									} else if (milestone) {
										if (milestone.type === "period") {
											currentColor = milestone.color;
										}
		
										weekDiv.style.backgroundColor = milestone.type === "point" ? milestone.color : currentColor;
										weekDiv.innerHTML = `<span class="tooltip">${milestone.description} - Week ${week}</span>`;
		
										if (milestone.type === "point") {
											weekDiv.style.border = "2px solid black";
										}
		
										if (!seenLegends[milestone.description]) {
											seenLegends[milestone.description] = true;
											const legendItem = document.createElement('div');
											legendItem.className = 'legend-item';
											legendItem.innerHTML = `
							<div class="legend-box" style="background-color: ${milestone.color}"></div>
							${milestone.description}
							`;
											legend.appendChild(legendItem);
										}
									} else {
										weekDiv.style.backgroundColor = currentColor;
										weekDiv.innerHTML = `<span class="tooltip">Week ${week}</span>`;
									}
		
									timeline.appendChild(weekDiv);
								}
