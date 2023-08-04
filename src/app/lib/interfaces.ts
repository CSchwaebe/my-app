export interface Attribute {
    trait_type: string,
    value: any
}

export interface AppData {
    first_name: any,
    last_name: any,
    display_name: any,
    code: any,
    event_points: any,
    team: any,
    team_code: any,
    team_name: any,
    team_abbreviation: any,
    now_cost: any,
    position: any,
    image_url: any,
    shirt_url: any,
}

export interface Player {
    description: string,
    external_url: string,
    image: string,
    name: string,
    attributes: Attribute[],
    app_data: AppData
}

export interface Team {
    address: string,
    team_name: string,
    gameweek: string,
    score: number,
    players: Player[]
}
/*
attributes: [
    {
        trait_type: "Assists",
        value: player[i].assists
    },
    {
        trait_type: "Bonus",
        value: player[i].bonus
    },
    {
        trait_type: "Bps",
        value: player[i].bps
    },
    {
        trait_type: "Chance Of Playing Next Round",
        value: player[i].chance_of_playing_next_round
    },
    {
        trait_type: "Chance Of Playing This Round",
        value: player[i].chance_of_playing_this_round
    },
    {
        trait_type: "Clean Sheets Per 90",
        value: player[i].clean_sheets_per_90
    },
    {
        trait_type: "Clean Sheets",
        value: player[i].clean_sheets
    },
    {
        trait_type: "Code",
        value: player[i].code
    },
    {
        trait_type: "Creativity Rank Type",
        value: player[i].creativity_rank_type
    },
    {
        trait_type: "Creativity Rank",
        value: player[i].creativity_rank
    },
    {
        trait_type: "Creativity",
        value: player[i].creativity
    },
    {
        trait_type: "Dreamteam Count",
        value: player[i].dreamteam_count
    },
    {
        trait_type: "Element Type",
        value: player[i].element_type
    },
    {
        trait_type: "Ep Next",
        value: player[i].ep_next
    },
    {
        trait_type: "Ep This",
        value: player[i].ep_this
    },
    {
        trait_type: "Event Points",
        value: player[i].event_points
    },
    {
        trait_type: "Expected Assists Per 90",
        value: player[i].expected_assists_per_90
    },
    {
        trait_type: "Expected Assists",
        value: player[i].expected_assists
    },
    {
        trait_type: "Expected Goal Involvements Per 90",
        value: player[i].expected_goal_involvements_per_90
    },
    {
        trait_type: "Expected Goal Involvements",
        value: player[i].expected_goal_involvements
    },
    {
        trait_type: "Expected Goals Conceded Per 90",
        value: player[i].expected_goals_conceded_per_90
    },
    {
        trait_type: "Expected Goals Conceded",
        value: player[i].expected_goals_conceded
    },
    {
        trait_type: "Expected Goals Per 90",
        value: player[i].expected_goals_per_90
    },
    {
        trait_type: "Expected Goals",
        value: player[i].expected_goals
    },
    {
        trait_type: "First Name",
        value: player[i].first_name
    },
    {
        trait_type: "Form Rank Type",
        value: player[i].form_rank_type
    },
    {
        trait_type: "Form Rank",
        value: player[i].form_rank
    },
    {
        trait_type: "Form",
        value: player[i].form
    },
    {
        trait_type: "Goals Conceded Per 90",
        value: player[i].goals_conceded_per_90
    },
    {
        trait_type: "Goals Conceded",
        value: player[i].goals_conceded
    },
    {
        trait_type: "Goals Scored",
        value: player[i].goals_scored
    },
    {
        trait_type: "Ict Index Rank Type",
        value: player[i].ict_index_rank_type
    },
    {
        trait_type: "Ict Index Rank",
        value: player[i].ict_index_rank
    },
    {
        trait_type: "Ict Index",
        value: player[i].ict_index
    },
    {
        trait_type: "Id",
        value: player[i].id
    },
    {
        trait_type: "In Dreamteam",
        value: player[i].in_dreamteam
    },
    {
        trait_type: "Influence Rank Type",
        value: player[i].influence_rank_type
    },
    {
        trait_type: "Influence Rank",
        value: player[i].influence_rank
    },
    {
        trait_type: "Influence",
        value: player[i].influence
    },
    {
        trait_type: "Minutes",
        value: player[i].minutes
    },
    {
        trait_type: "Now Cost Rank Type",
        value: player[i].now_cost_rank_type
    },
    {
        trait_type: "Now Cost Rank",
        value: player[i].now_cost_rank
    },
    {
        trait_type: "Now Cost",
        value: player[i].now_cost
    },
    {
        trait_type: "Own Goals",
        value: player[i].own_goals
    },
    {
        trait_type: "Penalties Missed",
        value: player[i].penalties_missed
    },
    {
        trait_type: "Penalties Saved",
        value: player[i].penalties_saved
    },
    {
        trait_type: "Photo",
        value: player[i].photo
    },
    {
        trait_type: "Points Per Game Rank Type",
        value: player[i].points_per_game_rank_type
    },
    {
        trait_type: "Points Per Game Rank",
        value: player[i].points_per_game_rank
    },
    {
        trait_type: "Points Per Game",
        value: player[i].points_per_game
    },
    {
        trait_type: "Red Cards",
        value: player[i].red_cards
    },
    {
        trait_type: "Saves Per 90",
        value: player[i].saves_per_90
    },
    {
        trait_type: "Saves",
        value: player[i].saves
    },
    {
        trait_type: "Second Name",
        value: player[i].second_name
    },
    {
        trait_type: "Squad Number",
        value: player[i].squad_number
    },
    {
        trait_type: "Starts Per 90",
        value: player[i].starts_per_90
    },
    {
        trait_type: "Starts",
        value: player[i].starts
    },
    {
        trait_type: "Team Code",
        value: player[i].team_code
    },
    {
        trait_type: "Team",
        value: player[i].team
    },
    {
        trait_type: "Threat Rank Type",
        value: player[i].threat_rank_type
    },
    {
        trait_type: "Threat Rank",
        value: player[i].threat_rank
    },
    {
        trait_type: "Threat",
        value: player[i].threat
    },

    {
        trait_type: "Total Points Rank Type",
        value: player[i].total_points_rank_type
    },
    {
        trait_type: "Total Points Rank",
        value: player[i].total_points_rank
    },
    {
        trait_type: "Total Points",
        value: player[i].total_points
    },
    {
        trait_type: "Transfers In Event",
        value: player[i].transfers_in_event
    },
    {
        trait_type: "Transfers In",
        value: player[i].transfers_in
    },
    {
        trait_type: "Transfers Out Event",
        value: player[i].transfers_out_event
    },
    {
        trait_type: "Transfers Out",
        value: player[i].transfers_out
    },
    {
        trait_type: "Value Form Rank Type",
        value: player[i].value_form_rank_type
    },
    {
        trait_type: "Value Form Rank",
        value: player[i].value_form_rank
    },
    {
        trait_type: "Value Form",
        value: player[i].value_form
    },
    {
        trait_type: "Value Season Rank Type",
        value: player[i].value_season_rank_type
    },
    {
        trait_type: "Value Season Rank",
        value: player[i].value_season_rank
    },
    {
        trait_type: "Value Season",
        value: player[i].value_season
    },
    {
        trait_type: "Web Name",
        value: player[i].web_name
    },
    {
        trait_type: "Yellow Cards",
        value: player[i].yellow_cards
    }
]
*/
